import { expect, test } from '@playwright/test';

test('renders the dashboard homepage navigation and key panels', async ({ page }) => {
  await page.goto('/');

  const navigation = page.getByRole('navigation', { name: 'Primary navigation' });

  await expect(page).toHaveTitle(/inoue\./);
  await expect(navigation.getByRole('link', { name: 'ブログ' })).toBeVisible();
  await expect(navigation.getByRole('link', { name: '作ったもの' })).toBeVisible();
  await expect(navigation.getByRole('link', { name: '勉強メモ' })).toBeVisible();
  await expect(navigation.getByRole('link', { name: '書籍メモ' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'inoue.' })).toBeVisible();
  await expect(page.getByLabel('JSTの現在時刻')).toBeVisible();
  await expect(page.getByLabel('アカウント', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '見るもの' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '最近の更新' })).toBeVisible();
  await expect(page.getByTestId('home-dashboard')).toBeVisible();
});

test('fits the full homepage into one desktop viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');

  const dashboard = page.getByTestId('home-dashboard');
  const box = await dashboard.boundingBox();
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize()?.height;

  if (!box) {
    throw new Error('home dashboard was not rendered');
  }

  expect(viewportHeight).toBeDefined();
  expect(pageHeight).toBeLessThanOrEqual(viewportHeight ?? 0);
  expect(box.y + box.height).toBeLessThanOrEqual(viewportHeight ?? 0);
  await expect(page.getByRole('heading', { name: '最近の更新' })).toBeInViewport();
  await expect(page.getByRole('contentinfo')).toBeInViewport();
});

test('keeps primary layout readable on mobile', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'inoue.' })).toBeInViewport();
  await expect(page.getByRole('heading', { name: '見るもの' })).toBeVisible();
});
