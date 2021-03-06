import { divide } from 'lodash';
import React from 'react';
import classNames from 'classnames';
import Image from "../components/elements/Image";
import SectionHeader from "../components/sections/partials/SectionHeader"
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

const DetectedInfo = ({
    listOfData,
    ...props
}) => {

    const sectionHeader = {
        title: 'Detection Result',
        paragraph: ''
    };

    const graphData = [
        {
            data: {
                moisture: 0.6,
                sugar: 0.6,
                vitamins: 0.8,
                acidity: 0.9,
                cellulose: 0.4,
                soluble_solids: 0.6
            },
            meta: {color: 'blue'} 
        },
        {
            data: {
                moisture: 0.2,
                sugar: 0.2,
                soluble_solids: 0.6,
                vitamins: 0.3,
                acidity: 0.3,
                cellulose: 0.5
            },
            meta: {color: 'red'} 
        }
    ]

    const graphCaptions = {
        moisture: 'Moisture',
        sugar: "Sugar",
        soluble_solids: "Soluble Solids",
        vitamins: "Vitamins",
        acidity: "Acidity",
        cellulose: "Cellulose"
    }

    const graphOptions = {
        captionProps: () => ({
            className: 'caption',
            textAnchor: 'middle',
            fontSize: 20,
            fontFamily: 'sans-serif'
          })
    }

    return (
        <div>
            <SectionHeader data={sectionHeader} className="center-content" />
            <RadarChart
                captions={graphCaptions}
                data={graphData}
                size={500}
                options={graphOptions}
            />
            {/* <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">
                    Robust Workflow
                    </h4>
                  <p className="m-0 text-sm">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                    </p>
                </div>
            </div> */}
        </div>

    )
};

export default DetectedInfo;