/// <reference types="@ueberbit/consent-manager" />

/* eslint-disable no-console */
/* global ConsentManager */
import '@ueberbit/consent-manager'
import './style.css'

// const button = document.querySelector('#button')

/** Programatically renew consent */
// button.addEventListener('click', () => ConsentManager.renew())

window.addEventListener('ConsentManager:onLoad', ({ detail }) => {
  console.log('ConsentManger:onLoad', detail)
})

window.addEventListener('ConsentManager:change:marketing', ({ detail }) => {
  console.log('ConsentManger:marketing', detail)
})

window.addEventListener('ConsentManager:change', ({ detail }) => {
  console.log('ConsentManger:change', detail)
})

window.addEventListener('ConsentManager:onAccept', () => {
  console.log('ConsentManger:onAccept')
})

window.addEventListener('ConsentManager:onDecline', () => {
  console.log('ConsentManger:onDecline')
})
