<template>
  <div class="Title flex-center">
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MzY0MDk5ZC0yYTkzLTliNDEtOGRmYy1jOGJmMzFlMzdmNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RDRjkwRTdEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RDRjkwRTZEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZGUzODVhZDQtYzhjNS00M2UxLTlkNWEtMTFmOGY5MGNlZWJkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgzNjQwOTlkLTJhOTMtOWI0MS04ZGZjLWM4YmYzMWUzN2Y3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmrrFTIAAAGpSURBVHjazNe9T4NAFADw947WcqXgRw1KqtbJxcXFpZN/gyaNU/+4Ti4k/glOHZyMg3H0q2mThqhtU+wHnKBEaWzluGLwEkIgufsBx733DkCwdUu5jH+I9kdR1DsVg0tLaw4nfw6HUCm45YjguCAKojgmgArhmBAaG8cE0Vg4Joxy40QUxRWZoqHqc7r7fYq/rXMihK5RinvFOurKOW4UDBGcxEbX8xT39ToQrHgTVYZVanoPEhsnsVBdoXhgfKLff0kZNNlELRcLJ9yoUaB4uFUHKYSGcWXJxHyWGydcaEmlpLI9Gw3jcsaEJYkLJ9GoRsnRroeSCscyKkOWmN5UROIEUmokWORWsOh/NNbs2u7FXQ0ct8Ex3j2M3RNwWSsqsHy8cTTes93GY80b8HIuyeAW3ibHMHJaPNHs61NH4q2+za7bPn41C2W9YZUNxm3eEDo1x5H4w2uP3XROp3Affbar0B9ZceI2CoXMzYKKO8tnMHRk96lbBWtgxU0WKJwkdEUFxiTWGbyIZKjU0uL/LARSLX1SLfZSLW9TLeiT3MIIt0U3be8CDADFKvt2TKvKzAAAAABJRU5ErkJggg=="
      alt=""
    />
    <span>{{ title }}</span>
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4MzY0MDk5ZC0yYTkzLTliNDEtOGRmYy1jOGJmMzFlMzdmNzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0RDRjkwRTdEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0RDRjkwRTZEODI5MTFFOTkwMjJEM0NGMjU2NjJCMDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZGUzODVhZDQtYzhjNS00M2UxLTlkNWEtMTFmOGY5MGNlZWJkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgzNjQwOTlkLTJhOTMtOWI0MS04ZGZjLWM4YmYzMWUzN2Y3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmrrFTIAAAGpSURBVHjazNe9T4NAFADw947WcqXgRw1KqtbJxcXFpZN/gyaNU/+4Ti4k/glOHZyMg3H0q2mThqhtU+wHnKBEaWzluGLwEkIgufsBx733DkCwdUu5jH+I9kdR1DsVg0tLaw4nfw6HUCm45YjguCAKojgmgArhmBAaG8cE0Vg4Joxy40QUxRWZoqHqc7r7fYq/rXMihK5RinvFOurKOW4UDBGcxEbX8xT39ToQrHgTVYZVanoPEhsnsVBdoXhgfKLff0kZNNlELRcLJ9yoUaB4uFUHKYSGcWXJxHyWGydcaEmlpLI9Gw3jcsaEJYkLJ9GoRsnRroeSCscyKkOWmN5UROIEUmokWORWsOh/NNbs2u7FXQ0ct8Ex3j2M3RNwWSsqsHy8cTTes93GY80b8HIuyeAW3ibHMHJaPNHs61NH4q2+za7bPn41C2W9YZUNxm3eEDo1x5H4w2uP3XROp3Affbar0B9ZceI2CoXMzYKKO8tnMHRk96lbBWtgxU0WKJwkdEUFxiTWGbyIZKjU0uL/LARSLX1SLfZSLW9TLeiT3MIIt0U3be8CDADFKvt2TKvKzAAAAABJRU5ErkJggg=="
      alt=""
    />
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.Title {
  height: 50px;
  span {
    font-size: 16px;
    margin: 0 10px;
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#f57a37),
      to(#f21b07)
    );
    background-image: linear-gradient(90deg, #f57a37 0, #f21b07);
    background-image: -moz-linear-gradient(to right, #f57a37 0, #f21b07 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  img {
    width: 15px;
    height: 15px;
  }
}
</style>
