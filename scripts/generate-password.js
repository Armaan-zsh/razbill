const bcrypt = require('bcrypt');

// CHANGE THIS to your desired password (50+ characters is great for security!)
const password = 'ThisIsMyVeryLongAndSecurePasswordThatNobodyWillEverGuessInAMillionYears2024!';

bcrypt.hash(password, 10).then(hash => {
    const hashB64 = Buffer.from(hash).toString('base64');

    console.log('\n=== ADMIN PASSWORD SETUP ===');
    console.log('Your new password is:', password);
    console.log('\nCopy this line into .env.local:\n');
    console.log(`ADMIN_PASSWORD_HASH_B64=${hashB64}`);
    console.log('\n============================\n');
});
