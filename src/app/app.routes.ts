import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomePageModule',
  },
  {
    path: 'about',
    loadChildren: './pages/about/about.module#AboutPageModule',
  },
  {
    path: 'work',
    loadChildren: './pages/work/work.module#WorkPageModule',
  },
  {
    path: 'skills',
    loadChildren: './pages/skills/skills.module#SkillsPageModule',
  },
  {
    path: 'codelabs',
    loadChildren: './pages/blog/blog.module#BlogModule',
  },
  {
    path: '**',
    loadChildren: './pages/not-found/not-found.module#NotFoundModule',
  },
  // {
  //   path: 'codelabs',
  //   loadChildren:
  //     './pages/blog-landing/blog-landing.module#BlogLandingPageModule',
  // },
  // {
  //   path: `codelabs/create-a-keybinding-service-in-angular`,
  //   loadChildren:
  //     './pages/blog-posts/create-keybind-service/create-keybind-service.module#CreateKeybindServicePost',
  // },
  // {
  //   path: 'codelabs/the-magic-of-css-variables',
  //   loadChildren:
  //     './pages/blog-posts/magic-of-css/magic-of-css.module#MagicOfCssPost',
  // },
  // {
  //   path: 'codelabs/object-recognition-in-the-browser-with-tensorflowjs',
  //   loadChildren:
  //     './pages/blog-posts/object-recognition-in-browser/object-recognition-in-browser.module#ObjectRecognitionInBrowserPost',
  // },
];
