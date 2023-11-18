function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = { position, delay };

      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  if (delay > 0 && step > 0 && amount > 0) {
    const promises = [];
    for (let i = 1; i <= amount; i++) {
      const promiseDelay = delay + (i - 1) * step;

      promises.push(createPromise(i, promiseDelay));
    }

    Promise.allSettled(promises).then(results => {
      for (const result of results) {
        if (result.status === 'fulfilled') {
          console.log(
            `✅ Fulfilled promise ${result.value.position} in ${result.value.delay}ms`
          );
        } else {
          console.log(
            `❌ Rejected promise ${result.reason.position} in ${result.reason.delay}ms`
          );
        }
      }
    });
  } else {
    console.log('Please enter valid data');
  }
});
