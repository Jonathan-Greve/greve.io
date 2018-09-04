using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace greve.io.Controllers
{
    [Route("api/[controller]")]
    public class ImagePermutatorController : ControllerBase
    {
        // GET: api/ImagePermutator
        [HttpGet("[action]")]
        public JsonResult Get(string name)
        {
            var reply = "Hello " + name + ", my name is Bob.";
            var test = new JsonResult(reply);
            return test;
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
