using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ImagePermutatorLibrary;
using System.Drawing;
using System.IO;

namespace greve.io.Controllers
{
    [Route("api/[controller]")]
    public class ImagePermutatorController : ControllerBase
    {
        // GET: api/ImagePermutator
        [HttpPost("[action]")]
        public JsonResult GetImageSheet(
            int imageWidth, int imageHeight, int sheetWidth, int sheetHeight,
            int xStart, int yStart, int cropWidth, int cropHeight, [FromBody] string image)
        {
            string[] splitImage = image.Split(",");
            Image inputImage = StringToImage(splitImage[1]);

            ImageSheet sheet = ImageSheet.FromImage(inputImage);
            sheet.SetSheetFormat(new CustomSheet(sheetWidth, sheetHeight));
            sheet.SetImageFormat(new CustomImageFormat(imageWidth, imageHeight));
            sheet.SetCropArea(xStart, yStart, xStart + cropWidth, yStart + cropHeight);
            if(sheetHeight > sheetWidth)
            {
                sheet.SetCroppedImageRotation(RotateFlipType.Rotate270FlipNone);
                sheet.SetOutputImageRotation(RotateFlipType.Rotate90FlipNone);
            }
            sheet.Create();

            byte[] result;
            using (MemoryStream stream = new MemoryStream())
            {
                sheet.OutputImage.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                result = stream.ToArray();
            }
            string outputImageString = Convert.ToBase64String(result);
            outputImageString = splitImage[0] + "," + outputImageString;
            inputImage.Dispose();
            sheet.CroppedImage.Dispose();
            sheet.OutputImage.Dispose();
            sheet.SourceImage.Dispose();

            return new JsonResult(outputImageString);
        }

        private Image StringToImage(string imageString)
        {
            byte[] bytes = Convert.FromBase64String(imageString);
            Stream imageStream = new MemoryStream(bytes);
            return new Bitmap(imageStream);
        }

        // GET: api/ImagePermutator/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ImagePermutator
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ImagePermutator/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
