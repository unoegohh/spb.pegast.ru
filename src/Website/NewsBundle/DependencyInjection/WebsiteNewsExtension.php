<?php

namespace Website\NewsBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Config\Definition\Processor;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class WebsiteNewsExtension extends Extension
{
  /**
   * {@inheritDoc}
   */
  public function load(array $configs, ContainerBuilder $container)
  {
    $processor = new Processor();
//    $configuration = new Configuration();
//    $config = $processor->processConfiguration($configuration, $configs);

//    $loader = new YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
//    $loader->load('services.yml');

    $loader = new XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
    $loader->load('news.xml');
  }
}
