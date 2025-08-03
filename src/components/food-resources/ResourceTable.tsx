import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Input,
} from "@/components/ui/input";

interface Resource {
  name: string;
  address: string;
  coordinates: string;
  peanutButter: number;
  bananas: number;
  bottledWater: number;
  granolaBars: number;
  diapers: number;
  tampons: number;
  soap: number;
  instantRamen: number;
}

const demoResources: Resource[] = [
  {
    name: "The Roberts Foundation - Food Distribution Center",
    address: "180 Redwood St #350, San Francisco, CA 94102",
    coordinates: "37.78103054422582, -122.4200077596358",
    peanutButter: 76,
    bananas: 76,
    bottledWater: 11,
    granolaBars: 67,
    diapers: 61,
    tampons: 9,
    soap: 47,
    instantRamen: 18
  },
  {
    name: "Project Open Hand",
    address: "730 Polk St, San Francisco, CA 94109",
    coordinates: "37.78392699932666, -122.41924991915745",
    peanutButter: 88,
    bananas: 12,
    bottledWater: 93,
    granolaBars: 56,
    diapers: 7,
    tampons: 86,
    soap: 8,
    instantRamen: 99
  },
  {
    name: "Southeast Asian Community - Food Distribution Center",
    address: "875 O'Farrell St, San Francisco, CA 94109",
    coordinates: "37.784944776413674, -122.41905913265019",
    peanutButter: 99,
    bananas: 56,
    bottledWater: 71,
    granolaBars: 82,
    diapers: 94,
    tampons: 8,
    soap: 64,
    instantRamen: 31
  },
  {
    name: "Nonassistance Food Stamp Program - Food Distribution Center",
    address: "1235 Mission St, San Francisco, CA 94103",
    coordinates: "37.77675577439444, -122.41374211915793",
    peanutButter: 75,
    bananas: 97,
    bottledWater: 21,
    granolaBars: 35,
    diapers: 82,
    tampons: 72,
    soap: 23,
    instantRamen: 69
  },
  {
    name: "TDNC - Kelly Cullen Neighborhood Pantry - Food Distribution Center",
    address: "210 Golden Gate Ave, San Francisco, CA 94102",
    coordinates: "37.782201700418234, -122.41407635963589",
    peanutButter: 93,
    bananas: 47,
    bottledWater: 54,
    granolaBars: 83,
    diapers: 75,
    tampons: 62,
    soap: 68,
    instantRamen: 51
  },
  {
    name: "St. Anthony Foundation",
    address: "150 Golden Gate Ave, San Francisco, CA 94102",
    coordinates: "37.782398661446535, -122.41316963080006",
    peanutButter: 98,
    bananas: 42,
    bottledWater: 88,
    granolaBars: 36,
    diapers: 0,
    tampons: 69,
    soap: 79,
    instantRamen: 9
  },
  {
    name: "Salvation Army - Kroc Center - Food Distribution Center",
    address: "240 Turk St, San Francisco, CA 94102",
    coordinates: "37.78316174212297, -122.41312151730732",
    peanutButter: 2,
    bananas: 88,
    bottledWater: 88,
    granolaBars: 22,
    diapers: 56,
    tampons: 2,
    soap: 54,
    instantRamen: 0
  },
  {
    name: "St. Anthony's Dining Room",
    address: "121 Golden Gate Ave Floor 1, San Francisco, CA 94102",
    coordinates: "37.78226757974537, -122.4131804461431",
    peanutButter: 31,
    bananas: 93,
    bottledWater: 83,
    granolaBars: 98,
    diapers: 98,
    tampons: 7,
    soap: 28,
    instantRamen: 36
  },
  {
    name: "San Francisco City Impact Rescue Mission",
    address: "140 Turk St, San Francisco, CA 94102",
    coordinates: "37.78363351402294, -122.4116016903219",
    peanutButter: 29,
    bananas: 0,
    bottledWater: 41,
    granolaBars: 39,
    diapers: 74,
    tampons: 48,
    soap: 90,
    instantRamen: 7
  },
  {
    name: "Youth with a Mission - Food Distribution Center",
    address: "357 Ellis St, San Francisco, CA 94102",
    coordinates: "37.78487645176414, -122.41213693265023",
    peanutButter: 56,
    bananas: 28,
    bottledWater: 86,
    granolaBars: 87,
    diapers: 7,
    tampons: 89,
    soap: 68,
    instantRamen: 61
  },
  {
    name: "El Mercadito de la Voz - Food Distribution Center",
    address: "456 Ellis St, San Francisco, CA 94102",
    coordinates: "37.785083896937294, -122.41374100196424",
    peanutButter: 69,
    bananas: 72,
    bottledWater: 20,
    granolaBars: 65,
    diapers: 39,
    tampons: 0,
    soap: 49,
    instantRamen: 34
  },
  {
    name: "Glide Memorial Church - Food Distribution Center",
    address: "330 Ellis St, San Francisco, CA 94102",
    coordinates: "37.78530655477329, -122.41168699032177",
    peanutButter: 20,
    bananas: 32,
    bottledWater: 35,
    granolaBars: 91,
    diapers: 81,
    tampons: 99,
    soap: 32,
    instantRamen: 70
  },
  {
    name: "San Francisco-Marin Food Bank",
    address: "300 Ellis St, San Francisco, CA 94102",
    coordinates: "37.78536977548696, -122.41101378847134",
    peanutButter: 45,
    bananas: 62,
    bottledWater: 38,
    granolaBars: 96,
    diapers: 11,
    tampons: 35,
    soap: 85,
    instantRamen: 42
  },
  {
    name: "CityTeam San Francisco",
    address: "164 6th St, San Francisco, CA 94103",
    coordinates: "37.78024406505149, -122.40780404799354",
    peanutButter: 65,
    bananas: 87,
    bottledWater: 9,
    granolaBars: 86,
    diapers: 24,
    tampons: 36,
    soap: 7,
    instantRamen: 51
  },
  {
    name: "Interfaith Coalition On Immigrant Rights - Food Distribution Center",
    address: "965 Mission St, San Francisco, CA 94103",
    coordinates: "37.78163410191613, -122.40752718847162",
    peanutButter: 64,
    bananas: 13,
    bottledWater: 98,
    diapers: 0,
    tampons: 39,
    soap: 86,
    instantRamen: 51
  },
  {
    name: "The Salvation Army South of Market Corps Community Center",
    address: "360 4th St, San Francisco, CA 94107",
    coordinates: "37.7813611454285, -122.40076623265027",
    peanutButter: 63,
    bananas: 89,
    bottledWater: 83,
    granolaBars: 83,
    diapers: 0,
    tampons: 81,
    soap: 73,
    instantRamen: 27
  },
  {
    name: "Donaldina Cameron House - Food Distribution Center",
    address: "920 Sacramento St, San Francisco, CA 94108",
    coordinates: "37.79348283600815, -122.40841713079965",
    peanutButter: 50,
    bananas: 65,
    bottledWater: 92,
    granolaBars: 44,
    diapers: 88,
    tampons: 98,
    soap: 11,
    instantRamen: 13
  }
];

const ResourceTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = demoResources.filter(resource =>
    Object.values(resource).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <Input
          placeholder="Search for food items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64"
        />
      </div>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Coordinates</TableHead>
              <TableHead>Peanut Butter</TableHead>
              <TableHead>Bananas</TableHead>
              <TableHead>Bottled Water</TableHead>
              <TableHead>Granola Bars</TableHead>
              <TableHead>Diapers</TableHead>
              <TableHead>Tampons</TableHead>
              <TableHead>Soap</TableHead>
              <TableHead>Instant Ramen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResources.map((resource, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell className="max-w-[200px] truncate">{resource.address}</TableCell>
                <TableCell className="max-w-[150px] truncate">{resource.coordinates}</TableCell>
                <TableCell className="text-center">{resource.peanutButter}</TableCell>
                <TableCell className="text-center">{resource.bananas}</TableCell>
                <TableCell className="text-center">{resource.bottledWater}</TableCell>
                <TableCell className="text-center">{resource.granolaBars}</TableCell>
                <TableCell className="text-center">{resource.diapers}</TableCell>
                <TableCell className="text-center">{resource.tampons}</TableCell>
                <TableCell className="text-center">{resource.soap}</TableCell>
                <TableCell className="text-center">{resource.instantRamen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ResourceTable;
