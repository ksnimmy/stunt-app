import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

type Props = {
    height: number[];
};

const Building: React.FC<Props> = ({ height }) => {
    const [areaText, setAreaText] = useState('');
    const [maxArea, setMaxArea] = useState<number>(0);
    const [series, setSeries] = useState([
        {
            name: 'Height',
            data: height,
            type: 'bar'
        },
        {
            name: 'Line',
            data: [],
            type: 'line'
        }
    ]);

    useEffect(() => {
        calculateMaxArea();
    }, [height]);

    const calculateMaxArea = () => {
        let maxarea = 0, left = 0, right = height.length - 1;
        // Initialize pointers for the maximum area
        let maxLeft = left, maxRight = right;
        while (left < right) {
            // Calculate the area with the current left and right pointers
            // Min of left and right to be considered for height, because the rope has to be at the level of lower height building
            let area = Math.min(height[left], height[right]) * (right - left);
            // If the calculated area is greater than the current maximum area
            if (area > maxarea) {
                // Update the maximum area and the pointers for the maximum area
                maxarea = area;
                maxLeft = left;
                maxRight = right;
            }
            // If the height at the left pointer is less than the height at the right pointer, move the pointers
            if (height[left] < height[right])
                left++;
            else
                right--;
        }
        setMaxArea(maxarea);
        drawLine(height, maxLeft, maxRight);
        setAreaText('H ' + Math.min(height[maxLeft], height[maxRight]) + ' X W ' + (maxRight - maxLeft));
    };

    const drawLine = (height: number[], left: number, right: number) => {
        let lineData = Array(height.length).fill(null);
        lineData[left] = height[left];
        lineData[right] = height[right];

        if (left !== -1 && right !== -1) {
            let minValue = Math.min(lineData[left], lineData[right]);
            for (let i = left; i <= right; i++) {
                lineData[i] = minValue;
            }
        }

        let series = [
            {
                name: 'Height',
                data: height,
                type: 'bar'
            },
            {
                name: 'Line',
                data: lineData,
                type: 'line'
            }
        ];
        setSeries(series);
    };

    const options: ApexOptions = {
        colors: ['#000ccc', '#FF0000'],
        chart: {
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Building Rope Stunt',
            align: 'left'
        },
        yaxis: {
            title: {
                text: 'Height'
            },
            max: Math.max(...height) + 2,
        },
        xaxis: {
            type: 'category',
            min: 0,
        }
    };

    return (
        <div>
            <Chart options={options} series={series} type="line" height={550} />
            <p>Max area is: {areaText} = <strong>{maxArea}</strong></p>
        </div>
    );
};

export default Building;
