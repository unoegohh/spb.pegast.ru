<?php

namespace Website\NewsBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Form\FormMapper;

class NewsAdmin extends Admin
{
  protected $baseRouteName = 'news';
  protected $baseRoutePattern = 'news';
  protected $translationDomain = 'WebsiteNewsBundle';
  protected $maxPerPage = 10;

  protected $list = array(
    'newsBrief' => array(
      'identifier' => true,
      'sortable' => false,
      'name' => 'admin.labels.newsBrief'
    ),
    'newsDate' => array(
      'name' => 'admin.labels.newsDate',
      'template' => 'WebsiteNewsBundle:Admin:list_datetime.html.twig',
    ),
    'isPublished' => array(
      'name' => 'admin.labels.isPublished'
    ),
    '_action' => array(
        'actions' => array(
            'delete' => array()
        ),
        'name' => 'admin.actions.delete'
    )
  );


  public function configureFormFields(FormMapper $form)
  {
      $translator = $this->getTranslator();
      $translatorDomain = $this->getTranslationDomain();

      $form->add('newsDate', array(
        //'widget' => 'single_text'
        ), array(
        'name' => $translator->trans('admin.labels.newsDate', array(), $translatorDomain),
        'type' => 'datetime'
      ));
      $form->add('newsBrief', array(), array(
        'name' => $translator->trans('admin.labels.newsBrief', array(), $translatorDomain)
      ));
      $form->add('newsText', array(), array(
        'name' => $translator->trans('admin.labels.newsText', array(), $translatorDomain)
      ));
      $form->add('isPublished', array(
        'required' => false
      ), array(
        'name' => $translator->trans('admin.labels.isPublished', array(), $translatorDomain)
      ));
  }
}
