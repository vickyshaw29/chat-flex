"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { useIsUserSubscribed } from '@/lib/hooks/useIsUserSubscribed';

const SubscriptionBanner = () => {
    const router = useRouter();
    const { subscription, membership, isSubscriptionLoading } = useIsUserSubscribed();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, 1700);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []); // Empty dependency array ensures this effect runs only once

    if (isSubscriptionLoading || membership === "Premium Membership") return null;

    return (
        <>
            {isVisible && !isSubscriptionLoading && (
                <Button style={{ width: '100%', borderRadius: 0 }} onClick={() => router.push("/pricing")}>
                    Upgrade to Premium to get all features!
                </Button>
            )}
        </>
    );
}

export default SubscriptionBanner;
