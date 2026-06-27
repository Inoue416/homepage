import { expect, test } from '@playwright/test';

test('renders the homepage navigation and section links', async ({ page }) => {
  await page.goto('/');

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });

  await expect(page).toHaveTitle(/inoueyuuya/);
  await expect(navigation.getByRole('link', { name: 'ブログ' })).toBeVisible();
  await expect(navigation.getByRole('link', { name: '作ったもの' })).toBeVisible();
  await expect(navigation.getByRole('link', { name: '勉強メモ' })).toBeVisible();
  await expect(navigation.getByRole('link', { name: '書籍メモ' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '書く、作る、学ぶ。' })).toBeVisible();
});

test('keeps primary layout readable on mobile', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { name: '書く、作る、学ぶ。' })).toBeInViewport();
});
