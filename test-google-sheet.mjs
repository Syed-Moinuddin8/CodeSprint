const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxNkEw9pOnFGQVJdQ3csZvBxs0CRHRCREKGQqbWrmDz4RGWjsXy1BDQl9VB6phJ3eY6MA/exec';

console.log('🧪 Testing Google Sheets Integration...\n');

const testData = {
  fullName: 'Test User',
  email: 'test@example.com',
  phone: '9876543210',
  college: 'Test College',
  teamName: 'Test Team',
  teamSize: 2,
  teamMembers: 'Member 2, Member 3',
  transactionId: 'TEST' + Date.now()
};

console.log('📤 Sending test registration:', testData);
console.log('📍 To URL:', GOOGLE_SCRIPT_URL);
console.log('');

try {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData)
  });

  console.log('📥 Response Status:', response.status);
  
  const result = await response.json();
  console.log('📥 Response Data:', result);
  console.log('');

  if (result.success) {
    console.log('✅ SUCCESS! Registration was saved to Google Sheets!');
    console.log('📊 Check your Google Sheet - you should see a new row!');
  } else {
    console.log('❌ FAILED:', result.error || 'Unknown error');
  }
} catch (error) {
  console.error('❌ ERROR:', error.message);
}
