<?php

namespace Website\OfficeBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Form\FormMapper;

class OfficeAdmin extends Admin
{
  protected $baseRouteName = 'office';
  protected $baseRoutePattern = 'office';
  protected $translationDomain = 'WebsiteOfficeBundle';
  protected $maxPerPage = 10;

  protected $list = array(
    'address' => array(
      'identifier' => true,
      'name' => 'admin.labels.address'
    ),
    'phone' => array(
      'name' => 'admin.labels.phone'
    ),
    'metro' => array(
      'name' => 'admin.labels.metro'
    ),
    '_action' => array(
      'actions' => array(
        'edit' => array(),
        'delete' => array()
      ),
      'name' => 'admin.actions.title'
    )
  );


  public function configureFormFields(FormMapper $form)
  {
      $translator = $this->getTranslator();
      $translatorDomain = $this->getTranslationDomain();

      $form->add('name', array(
        'required' => false
      ), array(
        'name' => $translator->trans('admin.labels.name', array(), $translatorDomain)
      ));
      $form->add('metro', array(), array(
        'name' => $translator->trans('admin.labels.metro', array(), $translatorDomain)
      ));
      $form->add('phone', array(), array(
        'name' => $translator->trans('admin.labels.phone', array(), $translatorDomain)
      ));
      $form->add('address', array(), array(
        'name' => $translator->trans('admin.labels.address', array(), $translatorDomain)
      ));
      $form->add('schedule', array(
        'required' => false
      ), array(
        'name' => $translator->trans('admin.labels.schedule', array(), $translatorDomain)
      ));
  }
}
