<?php

namespace Website\StaticBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
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

  public function menuAction($return_response = false) {
    $menu = new MenuItem('My menu');
    $menu->addChild('О компании', $this->generateUrl('about'));
    $menu->addChild('Подбор тура', $this->generateUrl('search'));
    $menu->addChild('Полезная информация', $this->generateUrl('info'));
    $menu->addChild('Погода на курортах', $this->generateUrl('weather'));
    $menu->addChild('Курс оплаты', $this->generateUrl('rate'));
    return $this->render('WebsiteStaticBundle:Static:menu.html.twig', array('menu' => $menu->toArray()));
  }
}
