<?php

namespace Website\StaticBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Knp\Bundle\MenuBundle\MenuItem;


class StaticController extends Controller
{
  public function indexAction()
  {
    return $this->render('WebsiteStaticBundle:Static:index.html.twig', array('index' => true));
  }

  public function staticAction($name) {
    $static = $this->get('doctrine')->getEntityManager()->getRepository('WebsiteStaticBundle:StaticPage')->findBy(array('route' => $name));

    if ($static) {
      return $this->render("WebsiteStaticBundle:Static:static.html.twig", array('page' => $static[0]));
    }
    else {
      throw new NotFoundHttpException('Раздел {$name} отсутствует на сайте.');
    }
  }

  public function searchAction() {
    return $this->render("WebsiteStaticBundle:Static:search.html.twig", array('query_string' => $this->getRequest()->server->get('QUERY_STRING')));
  }

  public function menuAction($return_response = false) {
    $menu = new MenuItem('My menu');
    $menu->addChild('О компании', $this->generateUrl('about'));
    $menu->addChild('Подбор тура', $this->generateUrl('travel_planner'));
    $menu->addChild('Полезная информация', $this->generateUrl('info'));
    $menu->addChild('Туры в рассрочку', $this->generateUrl('tours_in_credit'));
    return $this->render('WebsiteStaticBundle:Static:menu.html.twig', array('menu' => $menu->toArray()));
  }

  public function currencyRateAction() {
    $rate = null;
    $sourceURL = 'http://pegast.ru/samo5/currency';
    $expirationPeriod = 60 * 60;
    $cacheFile = $this->get('kernel')->getCacheDir() . '/currency';

    if (
      !is_file($cacheFile) ||
      (
       time() - filemtime($cacheFile) >= $expirationPeriod &&
       $rate = @file_get_contents($sourceURL)
      )
    ) {
      // Дублирование кода - плохо, но иначе нельзя
      // Получаем курсы валют в случае отсутствия файла кэша
      if (!$rate) {
        $rate = @file_get_contents($sourceURL);
      }
      // Отрезаем нативный <link> (чужие стили не нужны) и <script>
      $rate = preg_replace(array('/<link[^<>]+>/im', '!<script.*?>.*?</script>!im'), '', $rate);
      // Сохраняем $rate в файле кэша
      @file_put_contents($cacheFile, $rate);
    }
    // Если файл кэша существует и его размер больше 0, то читаем его содежимое
    elseif (is_file($cacheFile) && filesize($cacheFile) > 0) {
      $rate = @file_get_contents($cacheFile);
    }

    $response = new Response(iconv('CP1251', 'UTF-8', $rate));
    return $response;
  }
}
