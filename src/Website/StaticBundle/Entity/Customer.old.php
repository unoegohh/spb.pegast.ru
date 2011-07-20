<?php

namespace Website\StaticBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Entity\User;

/**
 * @ORM\Entity
 *
 * Website\StaticBundle\Entity\Customer
 */
class Customer extends User
{
  /**
   * @var integer $id
   *
   */
  protected $id;


  /**
   * Get id
   *
   * @return integer
   */
  public function getId()
  {
      return $this->id;
  }
}
