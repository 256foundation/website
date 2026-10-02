// Tests for the dedicated /contact page and the site-wide relink away from the
// home-page anchor. Source files are read off disk, matching the other suites.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (rel) => fs.readFileSync(path.join(process.cwd(), rel), 'utf8')

test('/contact page exists with the form and the general email', () => {
  const page = read('app/contact/page.tsx')
  assert.ok(page.includes("from '@/components/home/ContactForm'"), 'uses the shared ContactForm')
  assert.ok(page.includes('contact@256foundation.org'), 'lists the general email')
  assert.ok(page.includes("path: '/contact'"), 'declares its canonical path')
})

test('the footer, header, and mobile nav link to /contact', () => {
  for (const rel of ['components/layout/Header.tsx', 'components/layout/Footer.tsx', 'components/layout/MobileNav.tsx']) {
    const source = read(rel)
    assert.ok(source.includes('href="/contact"'), `${rel} should link to /contact`)
    assert.ok(!source.includes('href="/#contact"'), `${rel} should no longer use /#contact`)
  }
})

test('the footer lists the general email', () => {
  assert.ok(read('components/layout/Footer.tsx').includes('contact@256foundation.org'))
})

test('sitemap includes /contact', () => {
  assert.ok(read('app/sitemap.ts').includes('${baseUrl}/contact'))
})

test('the home page keeps its id="contact" anchor', () => {
  assert.ok(read('app/page.tsx').includes('id="contact"'))
})

test('the Libre Board article points at /contact', () => {
  const article = read('content/newsroom/libre-board-funding.mdx')
  assert.ok(article.includes('](/contact)'))
  assert.ok(!article.includes('](/#contact)'))
})
