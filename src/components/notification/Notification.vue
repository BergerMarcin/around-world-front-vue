<template />

<style>
.custom-swal-popup {
  background-color: var(--popup-background-color);
  margin: 50px;
  padding: 0;
  width: 350px;
  font-size: 1rem;
  grid-template-columns: 1fr 99fr 1fr;
  grid-column: 1/4;
  grid-row: 1/4;
}

.custom-swal-close-button {
  color: rgb(84, 84, 84);
  grid-column: 3/3;
  grid-row: 1/99;
  font-size: 2rem;
}
.custom-swal-close-button:hover {
  color: rgb(107, 32, 32);
}

.custom-swal-icon {
  scale: 0.5;
  margin: 20px 0;
  color: var(--icon-color) !important;
  border-color: var(--icon-color) !important;
}
/* icon's inner lines color */
div:where(.swal2-icon).swal2-error [class^='swal2-x-mark-line'],
div:where(.swal2-icon).swal2-success [class^='swal2-success-line'] {
  background-color: var(--icon-color) !important;
}

.custom-swal-html-container {
  align-content: center;
  padding: 15px 0;
  font-weight: 500;
}
</style>
