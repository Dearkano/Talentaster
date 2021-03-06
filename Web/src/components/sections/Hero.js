import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import FileUpload from '../../hackathon/FileUpload'
import DetectedInfo from '../../hackathon/DetectedInfo'
import DataUpload from '../../hackathon/DataUpload'
import FeaturesTiles from '../../components/sections/FeaturesTiles';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Fruiter Master in <span className="text-color-primary">Talentaster</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                <div>Want to know if the fruit is tasteful? </div>
                <div>Simply take a picture and get the answer! </div>
              </p>
              <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
                <a
                  data-video="https://www.youtube.com/embed/3mGac5Ey06w"
                  href="#0"
                  aria-controls="video-modal"
                  onClick={openModal}
                >
                  <Image
                    className="has-shadow"
                    src={require('./../../assets/images/video-placeholder.jpg')}
                    alt="Hero"
                    width={896}
                    height={504} />
                </a>
              </div>
              <Modal
                id="video-modal"
                show={videoModalActive}
                handleClose={closeModal}
                video="https://www.youtube.com/embed/3mGac5Ey06w"
                videoTag="iframe" />
              <div style={{height: 100}}> </div>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <FileUpload />
                {/* <DataUpload /> */}
              </div>
              <div className="reveal-from-bottom section-inner" data-reveal-delay="600">
                <DetectedInfo/>
              </div>
            </div>
          </div>
          {/* <FeaturesTiles /> */}

        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;