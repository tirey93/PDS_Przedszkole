﻿using MediatR;
using Microsoft.AspNetCore.Mvc;
using PrzedszkolePlus.Properties;
using PrzedszkolePlus.Queries;
using PrzedszkolePlus.Commands;
using PrzedszkolePlus.Requests;
using PrzedszkolePlus.Response;
using System.Net;

namespace PrzedszkolePlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnnouncementController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AnnouncementController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public async Task<ActionResult> Post([FromBody] AnnouncementRequest dto)
        {
            var request = new CreateAnnouncementCommand
            {
                Title = dto.Title,
                Content = dto.Content,
                FilePath = dto.FilePath,
            };

            try
            {
                await _mediator.Send(request);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
#if !DEBUG
        [Authorize(Roles = Roles.User)]
#endif
        public async Task<ActionResult<IEnumerable<AnnouncementResponse>>> Get()
        {
            try
            {
                var query = new GetAllAnnouncementsQuery();
                var result = await _mediator.Send(query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    string.Format(Resource.ControllerInternalError, ex.Message));
            }
        }

        [HttpPut("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public IActionResult Put(int id, AnnouncementRequest dto)
        {
            return NoContent();
        }

        [HttpDelete("{id:int}")]
#if !DEBUG
        [Authorize(Roles = Roles.Admin)]
#endif
        public ActionResult Delete(int id)
        {
            return NoContent();
        }
    }
}