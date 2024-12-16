# Week 8 - Final Project

This is the front end. The features are as follows:
1. Login Page (login.html)
Login Form: Users can log in to access personalized features. The form asks for a username and password.
Redirect after Login: Upon successful login, users are redirected to the artgallery.html page, where they can see and manage their artwork.
Login Feedback: After successful login, a success message is stored in localStorage and displayed when the user visits the login page again.
2. Registration Page (register.html)
Registration Form: New users can register by entering a username, email, and password. Upon successful registration, users are redirected to the login page.
Success Message: After successful registration, a success message is stored in localStorage and displayed on the login page.
3. Gallery Page (artgallery.html)
Artwork Display: Displays a gallery of images in a grid layout. Users can view artwork they have uploaded or that is publicly available.
Upload Functionality: Authenticated users can upload new artwork via a file input. After upload, the artwork appears in the gallery without needing to refresh the page.
Delete Functionality: Authenticated users can delete their uploaded artwork. After deletion, the artwork is immediately removed from the gallery, and the user is notified.
Responsive Layout: The gallery is responsive and adjusts for mobile and tablet screens, ensuring a seamless experience across devices.
4. Error Handling and Authentication
Protected Routes: The gallery and upload features are protected routes, visible only to authenticated users. If a user is not logged in, they are redirected to the login page.
Dynamic UI: The interface changes dynamically based on the user’s authentication state. The upload and delete buttons are hidden when the user is not logged in.
Session Management: User authentication status is stored in localStorage to maintain the session between page refreshes.