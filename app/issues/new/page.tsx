'use client';
import { TextField, TextArea, Box ,Flex,Button} from '@radix-ui/themes'; // Import TextArea
import React from 'react';

const NewIssuePage = () => {
  return (
    <div>
    <Flex direction="column" gap="3">
	<Box maxWidth="200px">
		<TextField.Root size="3" placeholder="Enter issue title" />
	</Box>

    <Box maxWidth="1000px">
		<TextArea resize="vertical" size="3" placeholder="Add issue description" />
	</Box>
    </Flex>

    <Button mt="4">Submit  Issue</Button> 

    </div>
  );
};

export default NewIssuePage;