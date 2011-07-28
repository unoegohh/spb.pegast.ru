<?php

namespace Website\OfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Website\OfficeBundle\Entity\Office
 */
class Office
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var string $name
     */
    private $name;

    /**
     * @var string $metro
     */
    private $metro;

    /**
     * @var string $phone
     */
    private $phone;

    /**
     * @var string $address
     */
    private $address;

    /**
     * @var text $schedule
     */
    private $schedule;

    /**
     * @var string $mapX
     */
    private $mapX;

    /**
     * @var string $mapY
     */
    private $mapY;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set metro
     *
     * @param string $metro
     */
    public function setMetro($metro)
    {
        $this->metro = $metro;
    }

    /**
     * Get metro
     *
     * @return string
     */
    public function getMetro()
    {
        return $this->metro;
    }

    /**
     * Set phone
     *
     * @param string $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }
    /**
     * Set address
     *
     * @param string $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set mapX
     *
     * @param string $mapX
     */
    public function setMapX($mapX)
    {
        $this->mapX = $mapX;
    }

    /**
     * Get mapX
     *
     * @return string
     */
    public function getMapX()
    {
        return $this->mapX;
    }

    /**
     * Set mapY
     *
     * @param string $mapY
     */
    public function setMapY($mapY)
    {
        $this->mapY = $mapY;
    }

    /**
     * Get mapY
     *
     * @return string
     */
    public function getMapY()
    {
        return $this->mapY;
    }

    /**
     * Set schedule
     *
     * @param text $schedule
     */
    public function setSchedule($schedule)
    {
        $this->schedule = $schedule;
    }

    /**
     * Get schedule
     *
     * @return text
     */
    public function getSchedule()
    {
        return $this->schedule;
    }

    public function __toString() {
      if ($this->name != '') {
        return $this->name;
      }
      else {
        $metroArray = preg_split('/,\s*/', $this->metro);
        return $metroArray[0];
      }
    }
}