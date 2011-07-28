<?php

namespace Website\StaticBundle\Entity;

use DateTime;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\DependencyInjection\ContainerInterface;


class TravelPlanner
{
    const CITY_PITER = 1;
    const CITY_MOSKVA = 2;
    const CITY_OTHER = 0;

    protected $city = 1;
    protected $cityOther;
    protected $country;
    protected $resort;
    protected $hotelLevel;
    protected $hotelName;
    protected $meal;
    protected $departureMin;
    protected $departureMax;
    protected $returnTo;
    protected $nightsMin = 7;
    protected $nightsMax = 7;
    protected $adult = 2;
    protected $children = 0;
    protected $office;
    protected $name;
    protected $phone;
    protected $email;
    protected $wishes;


    /**
     * Set city
     *
     * @param string $city
     */
    public function setCity($city) {
      $this->city = $city;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity() {
        return $this->city;
    }

    /**
     * Set cityOther
     *
     * @param string $cityOther
     */
    public function setCityOther($cityOther) {
      $this->cityOther = $cityOther;
    }

    /**
     * Get cityOther
     *
     * @return string
     */
    public function getCityOther() {
        return $this->cityOther;
    }

    /**
     * Set country
     *
     * @param string $country
     */
    public function setCountry($country) {
      $this->country = $country;
    }

    /**
     * Get country
     *
     * @return string
     */
    public function getCountry() {
        return $this->country;
    }

    /**
     * Set resort
     *
     * @param string $resort
     */
    public function setResort($resort) {
      $this->resort = $resort;
    }

    /**
     * Get resort
     *
     * @return string
     */
    public function getResort() {
        return $this->resort;
    }

    /**
     * Set hotelLevel
     *
     * @param string $hotelLevel
     */
    public function setHotelLevel($hotelLevel) {
      $this->hotelLevel = $hotelLevel;
    }

    /**
     * Get hotelLevel
     *
     * @return string
     */
    public function getHotelLevel() {
        return $this->hotelLevel;
    }

    /**
     * Set hotelName
     *
     * @param string $hotelName
     */
    public function setHotelName($hotelName) {
      $this->hotelName = $hotelName;
    }

    /**
     * Get hotelName
     *
     * @return string
     */
    public function getHotelName() {
        return $this->hotelName;
    }

    /**
     * Set meal
     *
     * @param string $meal
     */
    public function setMeal($meal) {
      $this->meal = $meal;
    }

    /**
     * Get meal
     *
     * @return string
     */
    public function getMeal() {
        return $this->meal;
    }

    /**
     * Set departureMin
     *
     * @param string $departureMin
     */
    public function setDepartureMin(DateTime $departureMin) {
      $this->departureMin = $departureMin;
    }

    /**
     * Get departureMin
     *
     * @return string
     */
    public function getDepartureMin() {
        return $this->departureMin;
    }

    /**
     * Set departureMax
     *
     * @param string $departureMax
     */
    public function setDepartureMax(DateTime $departureMax) {
      $this->departureMax = $departureMax;
    }

    /**
     * Get departureMax
     *
     * @return string
     */
    public function getDepartureMax() {
        return $this->departureMax;
    }

    /**
     * Set returnTo
     *
     * @param string $returnTo
     */
    public function setReturnTo(DateTime $returnTo) {
      $this->returnTo = $returnTo;
    }

    /**
     * Get returnTo
     *
     * @return string
     */
    public function getReturnTo() {
        return $this->returnTo;
    }

    /**
     * Set nightsMin
     *
     * @param string $nightsMin
     */
    public function setNightsMin($nightsMin) {
      $this->nightsMin = $nightsMin;
    }

    /**
     * Get nightsMin
     *
     * @return string
     */
    public function getNightsMin() {
        return $this->nightsMin;
    }

    /**
     * Set nightsMax
     *
     * @param string $nightsMax
     */
    public function setNightsMax($nightsMax) {
      $this->nightsMax = $nightsMax;
    }

    /**
     * Get nightsMax
     *
     * @return string
     */
    public function getNightsMax() {
        return $this->nightsMax;
    }

    /**
     * Set adult
     *
     * @param string $adult
     */
    public function setAdult($adult) {
      $this->adult = $adult;
    }

    /**
     * Get adult
     *
     * @return string
     */
    public function getAdult() {
        return $this->adult;
    }

    /**
     * Set children
     *
     * @param string $children
     */
    public function setChildren($children) {
      $this->children = $children;
    }

    /**
     * Get children
     *
     * @return string
     */
    public function getChildren() {
        return $this->children;
    }

    /**
     * Set office
     *
     * @param string $office
     */
    public function setOffice($office) {
      $this->office = $office;
    }

    /**
     * Get office
     *
     * @return string
     */
    public function getOffice() {
        return $this->office;
    }

    /**
     * Set name
     *
     * @param string $name
     */
    public function setName($name) {
      $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Set phone
     *
     * @param string $phone
     */
    public function setPhone($phone) {
      $this->phone = $phone;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone() {
        return $this->phone;
    }

    /**
     * Set email
     *
     * @param string $email
     */
    public function setEmail($email) {
      $this->email = $email;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail() {
        return $this->email;
    }

    /**
     * Set wishes
     *
     * @param string $wishes
     */
    public function setWishes($wishes) {
      $this->wishes = $wishes;
    }

    /**
     * Get wishes
     *
     * @return string
     */
    public function getWishes() {
        return $this->wishes;
    }

    /**
     * Sending email
     *
     * @param ContainerInterface $container
     * @param type $subject
     * @param type $body
     */
    public function sendEmail(ContainerInterface $container, $sender, $recipient, $subject, $body) {
      $mailer = $container->get('mailer');
      $message = $mailer->createMessage()
          ->setSubject($subject)
          ->setFrom($sender)
          ->setTo($recipient)
          ->setBody($body, 'text/html');
      $mailer->send($message);
    }
}
