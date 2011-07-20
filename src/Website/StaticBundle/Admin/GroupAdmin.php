<?php

namespace Website\StaticBundle\Admin;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\UserBundle\Admin\Entity\GroupAdmin as SonataGroupAdmin;

class GroupAdmin extends SonataGroupAdmin
{
    protected $translationDomain = 'WebsiteStaticBundle';

    protected $list = array(
        'name' => array('identifier' => true, 'name' => 'admin.group.labels.name'),
        'roles' => array('name' => 'admin.group.labels.roles')
    );

    protected $form = array();

    public function configureFormFields(FormMapper $form)
    {
        $translator = $this->getTranslator();
        $translatorDomain = $this->getTranslationDomain();

        $form->add('name', array(), array(
            'name' => $translator->trans('admin.group.labels.name', array(), $translatorDomain)
        ));

        $form->addType('roles', 'sonata_security_roles', array(
            'multiple' => true
        ), array(
            'type' => 'choice',
            'name' => $translator->trans('admin.group.labels.roles', array(), $translatorDomain)
        ));
    }

    public function getLabel()
    {
        return 'admin.group.label';
    }
}
