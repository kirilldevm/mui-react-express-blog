import { Button, FormLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getPostDetails, postUpdate } from '../helpers/index';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

interface Post {
  title: string;
  description: string;
  image: string;
  location: string;
}

interface Inputs {
  title: string;
  description: string;
  location: string;
  imageUrl: string;
}

const DiaryUpdate = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [inputs, setInputs] = useState<Inputs>({
    title: '',
    description: '',
    location: '',
    imageUrl: '',
  });

  const { id } = useParams<{ id: string }>();
  console.log(id);

  useEffect(() => {
    if (id) {
      getPostDetails(id)
        .then((data) => {
          if (data) {
            setPost(data);

            setInputs({
              title: data.title,
              description: data.description,
              imageUrl: data.image,
              location: data.location,
            });
          } else {
            console.error('No data received from getPostDetails');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputs);
    if (id) {
      postUpdate(inputs, id)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box display='flex' flexDirection={'column'} width='100%' height='100%'>
      <Box display='flex' margin='auto' padding={2}>
        <Typography
          fontWeight={'bold'}
          variant='h4'
          fontFamily={'dancing script'}
        >
          Update Your Travel Diary
        </Typography>
        <TravelExploreIcon
          sx={{ fontSize: '40px', paddingLeft: 1, color: 'lightcoral  ' }}
        />
      </Box>
      {post && (
        <form onSubmit={handleSubmit}>
          <Box
            padding={3}
            display='flex'
            width='80%'
            margin='auto'
            flexDirection={'column'}
          >
            <FormLabel sx={{ fontFamily: 'quicksand' }}>Title</FormLabel>
            <TextField
              onChange={handleChange}
              name='title'
              value={inputs.title}
              variant='standard'
              margin='normal'
            />
            <FormLabel sx={{ fontFamily: 'quicksand' }}>Description</FormLabel>
            <TextField
              onChange={handleChange}
              name='description'
              value={inputs.description}
              variant='standard'
              margin='normal'
            />
            <FormLabel sx={{ fontFamily: 'quicksand' }}>Image URL</FormLabel>
            <TextField
              onChange={handleChange}
              name='imageUrl'
              value={inputs.imageUrl}
              variant='standard'
              margin='normal'
            />

            <FormLabel sx={{ fontFamily: 'quicksand' }}>Location</FormLabel>
            <TextField
              onChange={handleChange}
              name='location'
              value={inputs.location}
              variant='standard'
              margin='normal'
            />

            <Button
              type='submit'
              color='warning'
              sx={{ width: '50%', margin: 'auto', mt: 2, borderRadius: 7 }}
              variant='contained'
            >
              Update
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default DiaryUpdate;
