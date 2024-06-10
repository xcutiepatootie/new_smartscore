"use client"
import { useRouter } from 'next/navigation';

const OtherPage = ({ params }: { params: { selectedValues: string, time: string } }) => {
    const router = useRouter();
    const selectedValues = params.selectedValues
    const time = params.time

    // Parse the query parameter values if needed
    const parsedSelectedValues = selectedValues ? JSON.parse(selectedValues as string) : [];
    const parsedTime = time ? JSON.parse(time as string) : '';

    // Rest of the component logic
    console.log(selectedValues, time)

    return (
        // JSX code
        <>
            <h1>Test</h1>
        </>
    );
};

export default OtherPage;
