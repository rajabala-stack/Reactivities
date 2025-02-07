 
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
 
using System;
 
using Application.Activities;
using System.Threading;

namespace API.Controllers
{
    public class ActivitiesController : BaseAPIController
    {
       

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct) {
            return await Mediator.Send(new List.Query(), ct);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id) {
            return await Mediator.Send(new Details.Query(){ Id=id});
        }        
        [HttpPost]
        public async Task<IActionResult> CreateActivit(Activity activity) {
            return Ok(await Mediator.Send(new Create.Command() { Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity) {
            activity.Id= id;
            return Ok(await Mediator.Send(new Edit.Command() {  Activity= activity }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id) {
            return Ok(await Mediator.Send(new Delete.Command() { Id = id}));
        }
    }
}