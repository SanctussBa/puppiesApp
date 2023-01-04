using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace puppiesApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PuppiesController : ControllerBase
{
    private readonly DataContext _context;

    public PuppiesController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Puppy>>> GetAllPuppies()
    {
        return Ok(await _context.Puppies.ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Puppy>> GetPuppyById(int id)
    {
        var puppy = await _context.Puppies.FindAsync(id);
        if (puppy == null)
        {
            return BadRequest($"Puppy by id '{id}' does not exist");
        }
        return Ok(puppy);
    }

    [HttpPost]
    public async Task<ActionResult<List<Puppy>>> AddNewPuppy(Puppy newPuppy)
    {
        _context.Puppies.Add(newPuppy);
        await _context.SaveChangesAsync();
        return Ok(await _context.Puppies.ToListAsync());

    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<List<Puppy>>> UpdatePuppy(Puppy updatedPuppy)
    {
        var puppy = await _context.Puppies.FindAsync(updatedPuppy.Id);
        if (puppy == null)
        {
            return BadRequest($"Puppy with id '{updatedPuppy.Id}' does not exist ");
        }
        
        puppy.Id = updatedPuppy.Id;
        puppy.Breed = updatedPuppy.Breed;
        puppy.Name = updatedPuppy.Name;
        puppy.BirthDate = updatedPuppy.BirthDate;

        await _context.SaveChangesAsync();
        return Ok(await _context.Puppies.ToListAsync());

    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<List<Puppy>>> DeletePuppy(int id)
    {
        var puppy = await _context.Puppies.FindAsync(id);
        if (puppy == null)
        {
            return BadRequest($"Puppy by id '{id}' does not exist");
        }
        _context.Puppies.Remove(puppy);
        await _context.SaveChangesAsync();
        return Ok(await _context.Puppies.ToListAsync());
    }

}
