<?php

namespace Website\StaticBundle\Admin;

use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\UserBundle\Admin\Entity\UserAdmin as SonataUserAdmin;

class UserAdmin extends SonataUserAdmin
{
    protected $translationDomain = 'WebsiteStaticBundle';

    protected $list = array(
        'username' => array('identifier' => true, 'name' => 'admin.customer.labels.username'),
        'email' => array('name' => 'admin.customer.labels.email'),
        'enabled' => array('name' => 'admin.customer.labels.enabled')
    );

    protected $filter = array();

    protected $formGroups = array(
        'admin.customer.groups.general' => array(
            'fields' => array('username', 'email', 'plainPassword')
        ),
        'admin.customer.groups.groups' => array(
            'fields' => array('groups')
        ),
        'admin.customer.groups.management' => array(
            'fields' => array('roles', 'enabled')
        )
    );

    public function configureFormFields(FormMapper $form)
    {
        $translator = $this->getTranslator();
        $translatorDomain = $this->getTranslationDomain();


        $form->add('username', array(), array(
            'name' => $translator->trans('admin.customer.labels.username', array(), $translatorDomain)
        ));
        $form->add('email', array(), array(
            'name' => $translator->trans('admin.customer.labels.email', array(), $translatorDomain)
        ));
        $form->add('plainPassword', array(), array(
          'name' => $translator->trans('admin.customer.labels.password', array(), $translatorDomain),
          'type' => 'string'
        ));
        $form->add('groups', array('required' => false), array(
            'name' => $translator->trans('admin.customer.labels.groups', array(), $translatorDomain)
        ));

        $form->addType('roles', 'sonata_security_roles', array(
            'multiple' => true,
        ), array(
            'type' => 'choice',
            'name' => $translator->trans('admin.customer.labels.roles', array(), $translatorDomain)
        ));
        $form->add('enabled', array('required' => false), array(
            'name' => $translator->trans('admin.customer.labels.enabled', array(), $translatorDomain)
        ));
    }

    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $translator = $this->getTranslator();
        $translatorDomain = $this->getTranslationDomain();

        $filter->add('username', array(
            'name' => $translator->trans('admin.customer.labels.username', array(), $translatorDomain)
        ));
        $filter->add('email', array(
            'name' => $translator->trans('admin.customer.labels.email', array(), $translatorDomain)
        ));
        $filter->add('id', array(
            'name' => $translator->trans('admin.customer.labels.id', array(), $translatorDomain)
        ));
    }

    public function getLabel()
    {
        return 'admin.customer.label';
    }
}
