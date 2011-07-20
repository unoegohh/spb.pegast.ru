<?php

namespace Website\OfficeBundle\Geocoding\Google;


class GoogleMap {
  protected $url = "http://maps.google.com/maps/geo?q=%s&output=json&key=%s";
  protected $googleMapsApiKey = null;


  public function __construct(&$container) {
    $this->googleMapsApiKey = $container->getParameter('google_maps_api_key');
  }

  public function getCoordinates($address) {
    $url = sprintf(
      $this->url,
      rawurlencode($address),
      $this->googleMapsApiKey
    );

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    $response = json_decode($response);

    if ($response->Status->code == 200 && count($response->Placemark) == 1) {
      return $response->Placemark[0]->Point->coordinates;
    }

    return $false;
  }
}
