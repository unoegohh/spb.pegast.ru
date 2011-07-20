<?php

namespace Website\NewsBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 *
 * Website\NewsBundle\Entity\News
 */
class News
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var datetime $newsDate
     *
     * @ORM\Column(name="news_date")
     */
    private $newsDate;

    /**
     * @var string $newsBrief
     *
     * @ORM\Column(name="news_brief")
     */
    private $newsBrief;

    /**
     * @var text $newsText
     *
     * @ORM\Column(name="news_text")
     */
    private $newsText;

    /**
     * @var text $isPublished
     *
     * @ORM\Column(name="is_published", type="boolean", nullable=true)
     */
    private $isPublished = false;


    public function __construct() {
      $this->newsDate = new DateTime();
    }

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
     * Set newsDate
     *
     * @param datetime $newsDate
     */
    public function setNewsDate(\DateTime $newsDate)
    {
        $this->newsDate = $newsDate;
    }

    /**
     * Get newsDate
     *
     * @return datetime
     */
    public function getNewsDate()
    {
        return $this->newsDate;
    }

    /**
     * Set newsBrief
     *
     * @param string $newsBrief
     */
    public function setNewsBrief($newsBrief)
    {
        $this->newsBrief = $newsBrief;
    }

    /**
     * Get newsBrief
     *
     * @return string
     */
    public function getNewsBrief()
    {
        return $this->newsBrief;
    }

    /**
     * Set newsText
     *
     * @param text $newsText
     */
    public function setNewsText($newsText)
    {
        $this->newsText = $newsText;
    }

    /**
     * Get newsText
     *
     * @return text
     */
    public function getNewsText()
    {
        return $this->newsText;
    }

    /**
     * Set isPublished
     *
     * @param text $isPublished
     */
    public function setIsPublished($isPublished)
    {
        $this->isPublished = $isPublished;
    }

    /**
     * Get isPublished
     *
     * @return text
     */
    public function getIsPublished()
    {
        return $this->isPublished;
    }
}