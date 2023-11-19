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

const form = document.querySelector('.form');
const delayInput = form.elements.delay;
const stepInput = form.elements.step;
const amountInput = form.elements.amount;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  if (delay >= 0 && step >= 0 && amount > 0) {
    for (let i = 1; i <= amount; i++) {
      const promiseDelay = delay + (i - 1) * step;

      try {
        const result = await createPromise(i, promiseDelay);
        console.log(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
      } catch (error) {
        console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
      }
    }
  } else {
    console.log('Please enter valid data');
  }
});