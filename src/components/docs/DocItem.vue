<template>
  <li class="dev-doc-item__container">
    <i class="dev-doc-item__icon">
      <slot name="icon"></slot>
    </i>
    <div class="dev-doc-item__details">
      <h3 class="dev-doc-item__heading">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.dev-doc-item__container {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.dev-doc-item__details {
  flex: 1;
  margin-left: 1rem;
}

.dev-doc-item__icon {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
}

.dev-doc-item__heading {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
}

@media (min-width: 1024px) {
  .dev-doc-item__container {
    margin-top: 0;
    margin-left: 2rem;
    padding: 0.4rem 1rem 1rem 32px;

    &:before,
    &:after {
      content: ' ';
      border-left: 1px solid var(--color-border-light);
      position: absolute;
      left: 0;
      height: calc(50% - 25px);
    }

    &:before {
      bottom: calc(50% + 25px);
    }

    &:after {
      top: calc(50% + 25px);
    }

    &:first-of-type:before,
    &:last-of-type:after {
      display: none;
    }
  }

  .dev-doc-item__icon {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border-light);
    background: var(--color-bg-white);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }
}
</style>
