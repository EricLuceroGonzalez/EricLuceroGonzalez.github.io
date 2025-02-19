---
title: 'Two Forms of Pre-rendering'
date: '2024-08-03'
id: 'asd'
order: 1
author: 'Eric Lucero'
authorAvatar: 'https://avatar.iran.liara.run/public/boy'
excerpt: 'Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page'
slug: 'pre-rendering'
doctype: "blog"
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.


For example, you should understand code like this:

```js
const basics = 'Okay, that should not be too difficult actually';

function printBasics() {
  console.log(basics):
}

printBasics();
```

Learn more about it [here](https://academind.com).

```python
# Colocar las casas en el mapa:
for i in range(len(dataset)):
    if dataset['ocean_proximity'].iloc[i]=='INLAND':
        folium.Circle(location=(dataset['latitude'].iloc[i], dataset['longitude'].iloc[i]),
                  radius=dataset['population'].iloc[i]/2,
                  stroke=False,
                 fill_color='red',
                 fill_opacity=0.3,
                  ).add_to(map_California)
    if dataset['ocean_proximity'].iloc[i]=='NEAR BAY':
            folium.Circle(location=(dataset['latitude'].iloc[i], dataset['longitude'].iloc[i]),
                    radius=dataset['population'].iloc[i]/2,
                    stroke=False,
                    fill_color='blue',
                    fill_opacity=0.3,
                    ).add_to(map_California)
    if dataset['ocean_proximity'].iloc[i]=='NEAR OCEAN':
            folium.Circle(location=(dataset['latitude'].iloc[i], dataset['longitude'].iloc[i]),
                    radius=dataset['population'].iloc[i]/2,
                    stroke=False,
                    fill_color='purple',
                    fill_opacity=0.3,
                    ).add_to(map_California)
```

# Cómo crear un div con fondo azul y borde rojo

En este tutorial, aprenderás cómo crear un `div` con un fondo azul y un borde rojo de 2px. Este es el código que necesitas:

```html
<div style="background-color: blue; border: 2px solid red; padding: 1rem; color: white;">
  Esto es un ejemplo de div con fondo azul y borde rojo.
</div>
```

## Imagen:

![AltText {258x212}{priority}{caption: Photo by Someone}](https://res.cloudinary.com/dcvnw6hvt/image/upload/v1739809759/elCronopio/xle8npibijpsgk9qkfnd.png)

Some paragraph text below image.

![AltText {258x212}{priority}{caption: Photo by Someone and the dispora. Esto es un ejemplo de div con fondo azul y borde rojo. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.}](https://res.cloudinary.com/dcvnw6hvt/image/upload/v1739809759/elCronopio/xle8npibijpsgk9qkfnd.png)