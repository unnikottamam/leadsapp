import { Html, Preview, Body, Container, Text, Tailwind } from '@react-email/components';
import React from 'react';

const LeadSubmission = ({ name }: { name: string }) => {
    return (
        <Html>
            <Preview>Contact Form Submitted!</Preview>
            <Tailwind>
                <Body className="bg-white">
                    <Container>
                        <Text className="font-bold text-3xl">Hello {name},</Text>
                        <Text>Thanks for your information, We will contact you ASAP.</Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default LeadSubmission