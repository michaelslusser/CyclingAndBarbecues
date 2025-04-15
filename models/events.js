"use strict";
const { DateTime } = require("luxon");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        type: {type: String, required: [true, 'event type is required']},
        url: {type: String, required: [true, 'image url is required']},
        title: {type: String, required: [true, 'title is required']},
        createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
        host: {type: String, required: [true, 'host is required']},
        rawDatetime: {
            startDate: {type: String, required: [true, 'rawDatetime.startDate is required']},
            startTime: {type: String, required: [true, 'rawDatetime.startTime is required']},
            endDate: {type: String, required: [true, 'rawDatetime.endDate is required']},
            endTime: {type: String, required: [true, 'rawDatetime.endTime is required']}
        },
        datetime: {type: String, required: [true, 'datetime is required']},
        endTime: {type: String, required: [true, 'endtime is required']},
        location: {type: String, required: [true, 'location is required']},
        details: {type: String, required: [true, 'details are required'],
                  minLength: [10, 'event details needs at least 10 characters']},
        numberGoing: {type: Number, required: [true, 'numberGoing is required']}
    }
);

// collection name is events in database
module.exports = mongoose.model('Event', eventSchema);


/*const exampleEvents = [
    {
        type: "cycling",
        url: "https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-9/69909563_10220128755355503_8873603996351201280_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8631f5&_nc_ohc=lKOdTuHPurgAX9rjELO&_nc_ht=scontent-iad3-2.xx&oh=00_AT8Dcue7imjoa1DkzyfTWOf_C13Cq0IPZ8zmkucqXNVjJQ&oe=63695B40",
        title: "Critical Mass Charlotte",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "Charlotte Urbanists and Fixed Federation",
        rawDatetime: {
            startDate: '2022-11-25',
            startTime: '19:00:00.000',
            endDate: '2022-11-25',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 25, 2022, 7:00 PM',
        endTime: 'Nov 25, 2022, 9:00 PM',
        location: "1st Ward Park, Charlotte, NC",
        details: "All human powered vehicles welcome! A slow-paced ride around 7 miles, guided by local cycling veterans. Come experience cycling the city of Charlotte in a car-free environment"
    },
    {
        type: "cycling",
        url: "https://se-images.campuslabs.com/clink/images/9e2ab3e5-7ff5-4bf3-86ff-0ebac68128879f66710a-0afb-4b70-866a-6891d5241de7.jpg?preset=med-sq",
        title: "UNC Charlotte Group Ride",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "Charlotte Road Cycling Club",
        rawDatetime: {
            startDate: '2022-11-26',
            startTime: '19:00:00.000',
            endDate: '2022-11-26',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 26, 2022, 7:00 PM',
        endTime: 'Nov 26, 2022, 9:00 PM',
        location: "UNC Charlotte, Charlotte, NC",
        details: "Group ride"
    },
    {
        type: "cycling",
        url: "https://www.copakeauction.com/ws/wp-content/uploads/2015/10/BICYCLE_SWAP_MEET.jpg",
        title: "Bikes and Coffee - Charlotte",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "Bikes and Coffee",
        rawDatetime: {
            startDate: '2022-11-26',
            startTime: '19:00:00.000',
            endDate: '2022-11-26',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 26, 2022, 7:00 PM',
        endTime: 'Nov 26, 2022, 9:00 PM',
        location: "1st Ward Park, Charlotte, NC",
        details: "Come have coffee with us and ride bikes"
    },
    {
        type: "barbecues",
        url: "https://charlotte49ers.com/images/logos/site/site.png",
        title: "UNC Charlotte Football Gameday Tailgating",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "UNC Charlotte",
        rawDatetime: {
            startDate: '2022-11-26',
            startTime: '19:00:00.000',
            endDate: '2022-11-26',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 26, 2022, 7:00 PM',
        endTime: 'Nov 26, 2022, 9:00 PM',
        location: "Jerry Richardson Stadium, Charlotte, NC",
        details: "On football gamedays, we do tailgating well before kickoff."
    },
    {
        type: "barbecues",
        url: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Barbecue.jpg",
        title: "Uptown BBQ Get-Together",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "Jonathan Doe",
        rawDatetime: {
            startDate: '2022-11-26',
            startTime: '19:00:00.000',
            endDate: '2022-11-26',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 26, 2022, 7:00 PM',
        endTime: 'Nov 26, 2022, 9:00 PM',
        location: "1st Ward Park, Charlotte, NC",
        details: "First come first served! Meet up for some barbecue and some good conversations."
    },
    {
        type: "barbecues",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Barbecued_meats.jpg/800px-Barbecued_meats.jpg",
        title: "The Barbecue Bash",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "City Barbecue",
        rawDatetime: {
            startDate: '2022-11-26',
            startTime: '19:00:00.000',
            endDate: '2022-11-26',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 26, 2022, 7:00 PM',
        endTime: 'Nov 26, 2022, 9:00 PM',
        location: "City Barbecue, University City, Charlotte, NC",
        details: "LOTS OF BARBECUE!"
    },
    {
        type: "both",
        url: "https://cimg7.ibsrv.net/gimg/bikeforums.net-vbulletin/640x480/tmp_cam_2003887066_f6488836fd1cc74edc0cb8f80c0413401dc88b37.jpg",
        title: "Race to City Barbecue",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "City Barbecue",
        rawDatetime: {
            startDate: '2022-11-26',
            startTime: '19:00:00.000',
            endDate: '2022-11-26',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 26, 2022, 7:00 PM',
        endTime: 'Nov 26, 2022, 9:00 PM',
        location: "1st Ward Park, Charlotte, NC",
        details: "We'll do a cycle from uptown to City Barbecue in University City"
    },
    {
        type: "both",
        url: "https://images.singletracks.com/blog/wp-content/uploads/2019/05/pig_bike_bbq_trail-1170x780.jpg",
        title: "The Big Barbecue Cycle",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "Redneck BBQ Lab",
        rawDatetime: {
            startDate: '2022-11-26',
            startTime: '19:00:00.000',
            endDate: '2022-11-26',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 26, 2022, 7:00 PM',
        endTime: 'Nov 26, 2022, 9:00 PM',
        location: "Redneck BBQ Lab, Benson, NC",
        details: "A long bike race where you must also eat barbecue!"
    },
    {
        type: "both",
        url: "https://realart.com/case-studies/images/GIH/gih_gallery_01.jpg",
        title: "Quandale Dingle's Cycling Barbecue",
        createdBy: ObjectId(63922e287ee7d9c20a83b50d),
        host: "Quandale Dingle",
        rawDatetime: {
            startDate: '2022-11-26',
            startTime: '19:00:00.000',
            endDate: '2022-11-26',
            endTime: '21:00:00.000'
        },
        datetime: 'Nov 26, 2022, 7:00 PM',
        endTime: 'Nov 26, 2022, 9:00 PM',
        location: "Quandale Dingle's house",
        details: "Quandale Dingle"
    }
];*/