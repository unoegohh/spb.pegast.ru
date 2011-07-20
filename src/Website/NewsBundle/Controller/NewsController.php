<?php

namespace Website\NewsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class NewsController extends Controller
{
  public function indexAction()
  {
    $news = $this->get('doctrine')->getEntityManager()->getRepository('WebsiteNewsBundle:News')->fetchAllDateDesc();
    return $this->render('WebsiteNewsBundle:News:index.html.twig', array('news' => $news));
  }

  public function lastAction($quantity = 3)
  {
    $news = $this->get('doctrine')->getEntityManager()->getRepository('WebsiteNewsBundle:News')->fetchLastNews($quantity);
    return $this->render('WebsiteNewsBundle:News:last_news.html.twig', array('news' => $news));
  }

  public function viewAction($id)
  {
    $item = $this->get('doctrine')->getEntityManager()->getRepository('WebsiteNewsBundle:News')->findOneBy(array('id' => $id));
    return $this->render('WebsiteNewsBundle:News:view.html.twig', array('item' => $item));
  }
}
