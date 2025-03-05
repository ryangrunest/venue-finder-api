import { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const geocodeApiToken = process.env.MAPBOX_TOKEN;

export const convertAddressToCoordinates = async (req: Request, res: Response) => {
  if (!geocodeApiToken) {
    return res.status(500).json({ message: 'Mapbox token not found!' });
  }
  try {
    const address_line1 = req.body.address;
    const place = req.body.city;
    const region = req.body.state;
    const postcode = req.body.zipCode;
    const country = req.body.country;

    if (!address_line1 || !place || !region || !postcode || !country) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // get info from mapbox geocode api
    const response = await fetch(`https://api.mapbox.com/search/geocode/v6/forward?address_line1=${address_line1}&place=${place}&region=${region}&postcode=${postcode}&country=${country}&access_token=${geocodeApiToken}`);
    if (!response.ok) { throw new Error('Error fetching data from mapbox!'); }
    const data = await response.json();

    // no address found
    if (data.features.length === 0) {
      return res.status(404).json({ message: "Address not found!" });
    }

    // address was found
    if (data.features.length > 1) {
      // take the first one, and grab the coordinates
      const coordinates = data.features[0].properties.coordinates;
      const longitude: number = coordinates.longitude;
      const latitude: number = coordinates.latitude;

      return res.status(200).json({ latitude, longitude });
    }


    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ message: err.message ?? "Error converting address to coordinates!" });
  }
}