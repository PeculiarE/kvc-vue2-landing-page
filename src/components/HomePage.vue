<template>
<div class="relative w-full z-20">
    <div class="w-full flex justify-between items-center">
      <div class="w-7 h-6 lg:w-9 lg:h-8">
        <img src="../assets/black_logo.svg" class="object-cover w-full h-full" alt="logo" />
      </div>
      <div class="w-9 h-9 lg:w-10 h-10">
        <img src="../assets/menu.svg" class="object-cover w-full h-full" alt="menu" />
      </div>
    </div>
    <div class="w-full grid place-items-center md:grid md:grid-cols-2 md:py-3">
      <div class="grid place-items-center md:place-items-start">
        <h1 class="mt-10 font-serif text-4xl lg:text-6xl text-black text-center md:text-left">Kinfolk Venture Capital</h1>
        <p class="mt-3 md:mt-5 font-sans text-base lg:text-lg text-gray-special text-center md:text-left">
          Family by design, celebrating cultural wealth, and empowering entrepreneurs to transform Africa.
        </p>
        <div class="mb-1 mt-3 md:mt-8 flex justify-center space-x-1 md:space-x-3 items-center">
          <p class="font-sans font-bold text-base lg:text-lg">READ MORE</p>
          <div class="w-4 h-4 lg:w-6 lg:h-6">
            <img src="../assets/arrow-right-circle.svg" class="object-cover w-full h-full" alt="arrow" />
          </div>
        </div>
        <div class="lg:mt-2 w-32 lg:w-36 h-px bg-gray-special opacity-40 place-self-center md:place-self-start"></div>
      </div>
      <div class="w-full grid place-items-center">
        <div class="w-full mt-9">
          <canvas id="my-canvas" ref="globe" class="w-full h-96 lg:h-xl max-h-screen"></canvas>
        </div>
        <div class="w-20 h-2 lg:w-36 lg:h-4 md:place-self-end">
          <img src="../assets/dots.svg" class="object-cover w-full h-full" alt="slider" />
        </div>
      </div>
    </div>
</div>
</template>

<script>
import {
  GlobeKitView, PointGlobe, Points, Atmosphere, Background, GKUtils,
} from '../lib/globekit.esm';
import clouds from '@/assets/clouds.png';
import bg from '@/assets/p2.jpeg';
import disk from '@/assets/disk.png';


export default {
  name: 'HomePage',
  mounted() {
    this.$nextTick(function () {
      const globe = this.$refs.globe;
      const textures = { noise: clouds };
      const generateRandomGeoJson = (count) => {
        const geojson = {
          type: 'FeatureCollection',
          features: [],
        };
        for (let i = 0; i < count; i += 1) {
          const feature = {
            type: 'Feature',
            properties: {
            },
            geometry: {
              type: 'Point',
              coordinates: [],
            },
          };
          const lat = Math.random() * 180 - 90;
          const lon = Math.random() * 360 - 180;
          feature.geometry.coordinates = [lon, lat];
          feature.properties.mythicalCreatureSightings = Math.floor(Math.random() * 30);
          geojson.features.push(feature);
        }
        return geojson;
      };
      const randomGeojson = generateRandomGeoJson(100);
      this.gkOptions = {
        wasmPath: 'https://fuselogo.s3.eu-central-1.amazonaws.com/gkweb_bg.wasm',
        attributes: {
          alpha: false,
        },
      };
      this.gkview = new GlobeKitView(globe, this.gkOptions);
      this.gkview.onSelection = (list) => {
        list.drawables.forEach((el) => {
          if (el.obj.id === this.pointglobe.id) {
            if (el.selection !== undefined) {
              this.pointglobe.rippleAtLocation(el.selection.lat, el.selection.lon, 3000);
            }
          } else if (el.obj.id === this.points.id) {
            if (el.selection !== undefined) {
              // Do something with selected point
            }
          }
        });
      };
      this.background = new Background(bg);
      this.gkview.addDrawable(this.background);
      this.atmosphere = new Atmosphere({
        texture: disk,
      });
      this.atmosphere.nScale = 1.02;
      this.gkview.addDrawable(this.atmosphere);
      fetch('https://fuselogo.s3.eu-central-1.amazonaws.com/pointglobe.bin')
        .then((res) => res.arrayBuffer())
        .then((data) => {
          const pointglobeParams = {
            pointSize: 0.004,
            randomPointSizeVariance: 0.004,
            randomPointSizeRatio: 0.1,
            minPointAlpha: 0.0,
            minPointSize: 0.006,
            color: '#F300A6',
          };
          this.pointglobe = new PointGlobe(textures, data, pointglobeParams);
          this.pointglobe.setInteractive(true, true, false);
        })
        .then(() => {
          this.gkview.addDrawable(this.pointglobe, () => {
            this.gkview.startDrawing();
          });
          this.points = new Points();
          this.points.transform = (element, point) => {
            point.color = GKUtils.lerpColor('#ff0000', '#00ff00', element.properties.mythicalCreatureSightings / 30);
            return point;
          };
          this.points.addGeojson(randomGeojson);
          this.points.setInteractive(true, true, false);
          this.gkview.addDrawable(this.points);
      });
    })
  }
}
</script>

<style scoped>
</style>
