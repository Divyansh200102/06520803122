import React from 'react';
import { Container, Title, Stack } from '@mantine/core';
import UrlForm from './components/UrlForm';

export default function App() {
  return (
    <Container size="sm" py="xl">
      <Stack spacing="xl">
        <Title align="center">🔗 URL Shortener</Title>
        <UrlForm />
      </Stack>
    </Container>
  );
}
