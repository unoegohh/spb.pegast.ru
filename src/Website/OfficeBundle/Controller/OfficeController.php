<?php

namespace Website\OfficeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Website\OfficeBundle\Geocoding\Google\GoogleMap;


class OfficeController extends Controller
{
    protected $mainAddress = 'Россия, Санкт-Петербург';

    public function indexAction()
    {
        return $this->render('WebsiteOfficeBundle:Office:index.html.twig', array());
    }

    public function shortListAction()
    {
        $offices = $this->get('doctrine')->getEntityManager()->getRepository('WebsiteOfficeBundle:Office')->findAll();
        foreach ($offices as $office) {
            $metroArray = preg_split('/,\s*/', $office->getMetro());
            $office->metroName = $metroArray[0];
        }
        return $this->render('WebsiteOfficeBundle:Office:shortList.html.twig', array('offices' => $offices));
    }

    public function viewAction($id)
    {
        $em = $this->get('doctrine')->getEntityManager();
        $office = $em->getRepository('WebsiteOfficeBundle:Office')->find($id);
        if ($office) {
            $geo = new GoogleMap($this->container);
            if (!$office->getMapX() && !$office->getMapY() && is_array($coords = $geo->getCoordinates($this->mainAddress . ', ' . $office->getAddress()))) {
                $office->setMapX($coords[1]);
                $office->setMapY($coords[0]);
                $em->flush();
            }
            $office->metroArray = preg_split('/,\s*/', $office->getMetro());
            return $this->render(
                "WebsiteOfficeBundle:Office:view.html.twig",
                array(
                     'api_key' => $this->container->getParameter('google_maps_api_key'),
                     'office' => $office
                )
            );
        }
        else {
            throw new NotFoundHttpException('Такого офиса не существует.');
        }
    }
}
