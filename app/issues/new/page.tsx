'use client';
import { TextField, TextArea, Box ,Flex,Button, Callout, Text} from '@radix-ui/themes'; // Import Text here!
import React, { useState } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm ,Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Correct import for useRouter
import {zodResolver} from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/api/issues/validation'; // Import the validation schema
import { set, z } from 'zod'; // Import zod for validation schema
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner'; // Import Spinner component
// Import SimpleMDE styles

type IssueForm = z.infer<typeof createIssueSchema>; // Define the form type based on the schema


const NewIssuePage = () => {
    const router = useRouter();
    const [error,setError ]= useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false); // State to manage submission status
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>(
        {
            resolver: zodResolver(createIssueSchema),
        }
    );

  return (

    <div>
        {error && (
          <Callout.Root color='red' mt="2"> {/* Added margin-top for spacing */}
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
    <form onSubmit={handleSubmit(async (data) => {
        try {
            setSubmitting(true); // Set submitting state to true
            await axios.post('/api/issues', data);
            router.push('/issues'); // Redirect to the issues page after submission

        } catch (error) {
            setSubmitting(false); // Reset submitting state
            setError('Failed to create issue. Please try again.'); // Set error message
        }
    })}>

    <Flex direction="column" gap="3">
    <Box maxWidth="200px">
        <TextField.Root size="3" placeholder="Enter issue title" {...register("title")} />
        
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
    </Box>


    <Box maxWidth="1000px">
        <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <SimpleMDE
                    {...field}
                    options={{
                        placeholder: "Add issue description"
                    }}
                />
            )}
        />
        {/* Add error display for description as well */}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
    </Box>
    </Flex>

    <Button disabled={submitting} mt="4">Submit Issue {submitting && <Spinner />}</Button>

    </form>
    </div>
  );
};

export default NewIssuePage;