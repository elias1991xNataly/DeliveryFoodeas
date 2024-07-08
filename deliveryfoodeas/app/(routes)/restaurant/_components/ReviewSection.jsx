"use client";
import React, { useEffect, useState } from 'react';
import { Textarea } from "/components/ui/textarea";

import { Rating as ReactRating } from '@smastrom/react-rating';

import Image from 'next/image';
import { Button } from '../../../../components/ui/button';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '../../../_utils/GlobalApi';
import { toast } from 'sonner';
import ReviewList from "./ReviewList";




const ReviewSection = ({ restaurant }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState();
    const { user } = useUser();
    const [reviewList, setReviewList] = useState();


    const handleSubmit = () => {

        const data = {
            email: user.primaryEmailAddress.emailAddress,
            profileImage: user?.imageUrl,
            userName: user?.fullName,
            star: rating,
            reviewText: reviewText,
            RestroSlug: restaurant.slug
        }


        GlobalApi.AddNewReview(data).then(resp => {
            console.log(resp);
            setReviewList(resp?.reviews);
            toast('Review Added!!');
            resp && getReviewList();
        })
    };

    useEffect(() => {
        restaurant && getReviewList();
    }, [restaurant])

    const getReviewList = () => {
        GlobalApi.getRestaurantReviews(restaurant.slug).then(resp => {
            console.log(resp);
            setReviewList(resp?.reviews);
        })
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
            <div className='flex flex-col gap-2 p-5 rounded-lg border shadow-lg mb-20'>
                <h2 className='font-bold text-lg'>Add your review</h2>
                <ReactRating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                <Textarea onChange={(e => setReviewText(e.target.value))} />
                <Button
                    disabled={rating == 0 || !reviewText}
                    onClick={() => handleSubmit()}>Submit</Button>
            </div>
            <div className='col-span-2'>
                <ReviewList reviewList={reviewList} />
            </div>
        </div>
    )
}

export default ReviewSection