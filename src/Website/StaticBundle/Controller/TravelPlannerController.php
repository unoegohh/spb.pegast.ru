<?php

namespace Website\StaticBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Website\StaticBundle\Entity\TravelPlanner;
use Website\StaticBundle\Form\TravelPlannerType;


class TravelPlannerController extends Controller
{
  public function indexAction() {
    $travelPlanner = new TravelPlanner();
    $form = $this->createForm(new TravelPlannerType($this->get('translator')), $travelPlanner);
    return $this->render('WebsiteStaticBundle:TravelPlanner:form.html.twig', array(
      'form' => $form->createView(),
      'sended' => $this->getRequest()->query->get('ok')
    ));
  }

  public function submitAction() {
    $travelPlanner = new TravelPlanner();
    $form = $this->createForm(new TravelPlannerType($this->get('translator')), $travelPlanner);

    $request = $this->get('request');
    $form->bindRequest($request);

    if ($form->isValid()) {
      $data = $this->getRequest()->request->get($form->getName());
      $office = $this->get('doctrine.orm.entity_manager')
          ->getRepository('WebsiteOfficeBundle:Office')
          ->findBy(array('id' => $data['office']));
//          ->createQueryBuilder('u')
//          ->select('u')
//          ->where('u.id = :id')
//          ->setParameter('id', $data['office'])
//          ->getQuery()
//          ->getResult()
//          ->__toString();
//      };
//var_dump($office); die;
      $travelPlanner->sendEmail(
        $this->container,
        array(
          $this->container->getParameter('website.static.travel_planner.send_mail.sender.email')
            => $this->container->getParameter('website.static.travel_planner.send_mail.sender.name')
        ),
        $this->container->getParameter('website.static.travel_planner.send_mail.recipient.email'),
        ($this->container->getParameter('website.static.travel_planner.send_mail.recipient.bcc.email') ?: ''),
        $this->container->getParameter('website.static.travel_planner.send_mail.subject'),
        $this->renderView('WebsiteStaticBundle:TravelPlanner:mail.html.twig', array(
          'data' => array_merge($data, array('office' => $office[0]->__toString())),
          'sended' => null
        ))
      );
      return $this->redirect($this->generateUrl('travel_planner', array('ok' => true)));
    }

    return $this->render('WebsiteStaticBundle:TravelPlanner:form.html.twig', array(
      'form' => $form->createView(),
      'sended' => null
    ));
  }
}
