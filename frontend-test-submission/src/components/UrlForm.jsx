import React, { useState } from 'react';
import { TextInput, Button, Paper, Group, Text, Alert } from '@mantine/core';
import axios from 'axios';
import log from '../utils/log';

export default function UrlForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [validityMins, setValidityMins] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const payload = { originalUrl, validityMins, customCode };
      const res = await axios.post('http://localhost:5000/api/url/shorten', payload);

      setResult(res.data);
      setError('');
      log('frontend', 'info', 'config', 'Short URL created');
    } catch (err) {
      setResult(null);
      setError(err.response?.data?.error || 'Request failed');
      log('frontend', 'error', 'config', `Shorten failed: ${err.message}`);
    }
  };

  return (
    <Paper shadow="xs" p="md" withBorder>
      <TextInput
        label="Original URL"
        placeholder="https://example.com"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.currentTarget.value)}
        required
      />
      <Group grow mt="md">
        <TextInput
          label="Validity (minutes)"
          value={validityMins}
          onChange={(e) => setValidityMins(e.currentTarget.value)}
          type="number"
        />
        <TextInput
          label="Custom Shortcode"
          value={customCode}
          onChange={(e) => setCustomCode(e.currentTarget.value)}
        />
      </Group>

      <Button fullWidth mt="lg" onClick={handleSubmit}>
        Shorten URL
      </Button>

      {result && (
        <Alert mt="md" color="green">
          <Text>Short URL:</Text>
          <a href={result.shortUrl} target="_blank" rel="noreferrer">
            {result.shortUrl}
          </a>
        </Alert>
      )}

      {error && (
        <Alert mt="md" color="red">
          {error}
        </Alert>
      )}
    </Paper>
  );
}
