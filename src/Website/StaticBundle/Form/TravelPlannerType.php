<?php

namespace Website\StaticBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;
use Doctrine\ORM\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Translation\Translator;
use Website\StaticBundle\Entity\TravelPlanner;

class TravelPlannerType extends AbstractType
{
  protected $translator;

  function __construct(Translator $translator) {
    $this->translator = $translator;
  }

  public function buildForm(FormBuilder $builder, array $options)
  {
    $builder->add('city', 'choice', array(
      'required' => false,
      'choices' => array(
        TravelPlanner::CITY_PITER => $this->translator->transChoice('travel_planner.choices.city', TravelPlanner::CITY_PITER, array(), 'WebsiteStaticBundle'),
        TravelPlanner::CITY_MOSKVA => $this->translator->transChoice('travel_planner.choices.city', TravelPlanner::CITY_MOSKVA, array(), 'WebsiteStaticBundle'),
        TravelPlanner::CITY_OTHER => $this->translator->transChoice('travel_planner.choices.city', TravelPlanner::CITY_OTHER, array(), 'WebsiteStaticBundle')
      ),
      'label' => $this->translator->trans('travel_planner.labels.city', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('cityOther', 'text', array(
      'required' => false,
      'label' => $this->translator->trans('travel_planner.labels.cityOther', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('country', 'text', array(
      'required' => false,
      'label' => $this->translator->trans('travel_planner.labels.country', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('resort', 'text', array(
      'required' => false,
      'label' => $this->translator->trans('travel_planner.labels.resort', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('hotelLevel', 'text', array(
      'required' => false,
      'label' => $this->translator->trans('travel_planner.labels.hotelLevel', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('hotelName', 'text', array(
      'required' => false,
      'label' => $this->translator->trans('travel_planner.labels.hotelName', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('meal', 'text', array(
      'required' => false,
      'label' => $this->translator->trans('travel_planner.labels.meal', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('departureMin', 'date', array(
      'widget' => 'single_text',
      'label' => $this->translator->trans('travel_planner.labels.departureMin', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('departureMax', 'date', array(
      'widget' => 'single_text',
      'label' => $this->translator->trans('travel_planner.labels.departureMax', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('returnTo', 'date', array(
      'widget' => 'single_text',
      'label' => $this->translator->trans('travel_planner.labels.returnTo', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('nightsMin', 'choice', array(
      'choices' => array_combine(range(1, 29), range(1, 29)),
      'label' => $this->translator->trans('travel_planner.labels.nightsMin', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('nightsMax', 'choice', array(
      'choices' => array_combine(range(1, 29), range(1, 29)),
      'label' => $this->translator->trans('travel_planner.labels.nightsMax', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('adult', 'choice', array(
      'choices' => array_combine(range(1, 9), range(1, 9)),
      'label' => $this->translator->trans('travel_planner.labels.adult', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('children', 'choice', array(
      'choices' => array_combine(range(0, 10), range(0, 10)),
      'label' => $this->translator->trans('travel_planner.labels.children', array(), 'WebsiteStaticBundle')
    ));
    $builder->add(
      'office',
      'entity',
      array(
        'class' => 'Website\\OfficeBundle\\Entity\\Office',
        'query_builder' => function(EntityRepository $er) {
          return $er->createQueryBuilder('u');
        },
        'required' => false,
      'label' => $this->translator->trans('travel_planner.labels.office', array(), 'WebsiteStaticBundle')
      )
    );
    $builder->add('name', 'text', array(
      'validation_groups' => array("contact"),
      'label' => $this->translator->trans('travel_planner.labels.name', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('phone', 'text', array(
      'validation_groups' => array("contact"),
      'label' => $this->translator->trans('travel_planner.labels.phone', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('email', 'email', array(
      'validation_groups' => array("contact"),
      'label' => $this->translator->trans('travel_planner.labels.email', array(), 'WebsiteStaticBundle')
    ));
    $builder->add('wishes', 'textarea', array(
      'required' => false,
      'label' => $this->translator->trans('travel_planner.labels.wishes', array(), 'WebsiteStaticBundle')
    ));
  }

  public function getDefaultOptions(array $options)
  {
    return array(
      'data_class' => 'Website\StaticBundle\Entity\TravelPlanner',
    );
  }

  public function getName()
  {
    return 'travel_planner';
  }
}
