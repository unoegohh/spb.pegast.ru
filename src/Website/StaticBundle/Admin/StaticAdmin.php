<?php

namespace Website\StaticBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Form\FormMapper;

class StaticAdmin extends Admin
{
  protected $baseRouteName = 'static';
  protected $baseRoutePattern = 'static';
  protected $translationDomain = 'WebsiteStaticBundle';
  protected $maxPerPage = 10;

  protected $list = array(
    'title' => array(
      'identifier' => true,
      'name' => 'admin.labels.title'
    ),
    'route' => array(
      'name' => 'admin.labels.route'
    ),
    '_action' => array(
      'actions' => array(
          'delete' => array()
      ),
      'name' => 'admin.actions.delete'
    )
//    ,  '_batch_actions' => array()
  );


  public function configureFormFields(FormMapper $form)
  {
      $translator = $this->getTranslator();
      $translatorDomain = $this->getTranslationDomain();

      $form->add('route', array('read_only' => true), array(
        'name' => $translator->trans('admin.labels.route', array(), $translatorDomain)//,
//        'type' => 'string'
      ));
      $form->add('title', array(), array(
        'name' => $translator->trans('admin.labels.title', array(), $translatorDomain)
      ));
      $form->add('content', array(), array(
        'name' => $translator->trans('admin.labels.content', array(), $translatorDomain)
      ));
  }

//  public function getFormBuilder($object = null, $options = array()) {
//    $fb = parent::getFormBuilder($object, $options);
//    $fb->add('route', 'hidden');
//    return $fb;
//  }
//
//  public function getNewInstance()
//  {
//    $obj = parent::getNewInstance();
//    $request = $this->getRequest();
//    $obj->parent = $request->query->get('parent');
//    $parent = $this->getModelManager()->findOne($this->getClass(), $obj->parent);
//
//    $config = new Config($this->getModelManager()->getEntityManager(), $this->getClass());
//    $nsm = new Manager($config);
//    $node = $nsm->fetchBranch($obj->parent);
//    $path = $node->getPath('/', true);
//
//    $obj->parentName = $parent->getName();
//    $obj->url = '/' . $path;
//
//    return $obj;
//  }
}
