'use client';
import { TextField, TextArea, Box ,Flex,Button} from '@radix-ui/themes'; // Import TextArea
import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm ,Controller} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/dist/client/components/navigation';
// Import SimpleMDE styles

interface IssueForm {
    title: string;
    description: string;
    }

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();
  return (
    <form onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues'); // Redirect to the issues page after submission
        // Here you can handle the form submission, e.g., send data to an API
    })}>
    
    <Flex direction="column" gap="3">
	<Box maxWidth="200px">
		<TextField.Root size="3" placeholder="Enter issue title" {...register("title")} />
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
	</Box>
    </Flex>

    <Button mt="4">Submit  Issue</Button> 

    </form>
  );
};

export default NewIssuePage;