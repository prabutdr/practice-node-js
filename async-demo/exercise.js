
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendEmailIfGoldCustomers(id) {
  const customer = await getCustomer(id);
  console.log('Customer: ', customer);
  if (customer.isGold) {
    const movies = await getTopMovies();
    console.log('Top movies: ', movies);
    await sendEmail(customer.email, movies);
    console.log('Email sent...');
  }
}

sendEmailIfGoldCustomers(1);

// getCustomer(1)
//   .then(customer => {
//     console.log('Customer', customer);
//     if (customer.isGold) {
//       return getTopMovies();
//     }
//   })
//   .then(movies => {
//     console.log('Top movies: ', movies);

//   })

function getCustomer(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  });
}

function getTopMovies() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Sending email...');
      resolve();
    }, 4000);
  });
}