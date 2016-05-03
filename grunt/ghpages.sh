cd dist
git init
git checkout -B gh-pages
git add .
git commit -m "Github Pages"
git remote add origin git@github.com:mzgoddard/transform-restyle-performance.git
git push origin gh-pages -f
